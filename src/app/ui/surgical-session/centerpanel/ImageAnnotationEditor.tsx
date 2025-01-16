import { useCallback, useEffect, useState } from 'react'
import {
    AssetRecordType,
    Editor,
    SVGContainer,
    TLImageShape,
    TLShapeId,
    Tldraw,
    createShapeId,
    exportToBlob,
    track,
    useEditor,
} from 'tldraw'
import { AnnotatorImage } from './types'

export function ImageAnnotationEditor({
    image,
    onDone,
}: {
    image: AnnotatorImage
    onDone(result: Blob): void
}) {
    const [imageShapeId, setImageShapeId] = useState<TLShapeId | null>(null)
    const [editor, setEditor] = useState(null as Editor | null)

    function onMount(editor: Editor) {
        setEditor(editor)
    }

    useEffect(() => {
        if (!editor) return

        // Create the asset and image shape
        const assetId = AssetRecordType.createId()
        editor.createAssets([
            {
                id: assetId,
                typeName: 'asset',
                type: 'image',
                meta: {},
                props: {
                    w: image.width,
                    h: image.height,
                    mimeType: image.type,
                    src: image.src,
                    name: 'image',
                    isAnimated: false,
                },
            },
        ])
        const shapeId = createShapeId()
        editor.createShape<TLImageShape>({
            id: shapeId,
            type: 'image',
            x: 0,
            y: 0,
            props: {
                w: image.width,   // Explicitly set width from image prop
                h: image.height,  // Explicitly set height from image prop
                assetId,
            },
            // Remove isLocked to allow manipulation
        })

        // Make sure the shape is at the bottom of the page
        function makeSureShapeIsAtBottom() {
            if (!editor) return

            const shape = editor.getShape(shapeId)
            if (!shape) return

            const pageId = editor.getCurrentPageId()

            // The shape should always be the child of the current page
            if (shape.parentId !== pageId) {
                editor.moveShapesToPage([shape], pageId)
            }

            // The shape should always be at the bottom of the page's children
            const siblings = editor.getSortedChildIdsForParent(pageId)
            const currentBottomShape = editor.getShape(siblings[0])!
            if (currentBottomShape.id !== shapeId) {
                editor.sendToBack([shape])
            }
        }

        makeSureShapeIsAtBottom()

        const removeOnCreate = editor.sideEffects.registerAfterCreateHandler(
            'shape',
            makeSureShapeIsAtBottom
        )

        const removeOnChange = editor.sideEffects.registerAfterChangeHandler(
            'shape',
            makeSureShapeIsAtBottom
        )

        // Reset the history
        editor.clearHistory()
        setImageShapeId(shapeId)

        return () => {
            removeOnChange()
            removeOnCreate()
        }
    }, [image, editor])

    useEffect(() => {
        if (!editor) return
        if (!imageShapeId) return

        /**
         * Adjust camera options to fit the image
         */
        editor.setCameraOptions({
            constraints: {
                initialZoom: 'fit-max',
                baseZoom: 'default',
                bounds: { w: image.width, h: image.height, x: 0, y: 0 },
                padding: { x: 32, y: 64 },
                origin: { x: 0.5, y: 0.5 },
                behavior: 'contain',
            },
            zoomSteps: [1, 2, 4, 8],
            zoomSpeed: 1,
            panSpeed: 1,
            isLocked: false,
        })
        editor.setCamera(editor.getCamera(), { reset: true })
    }, [editor, imageShapeId, image])

    return (
        <Tldraw
            onMount={onMount}
            components={{
                // we don't need pages for this use-case
                PageMenu: null,
                // grey-out the area outside of the image
                InFrontOfTheCanvas: useCallback(() => {
                    if (!imageShapeId) return null
                    return <ImageBoundsOverlay imageShapeId={imageShapeId} />
                }, [imageShapeId]),
                // add a "done" button in the top right for when the user is ready to export
                // SharePanel: useCallback(() => {
                //     if (!imageShapeId) return null
                //     return <DoneButton imageShapeId={imageShapeId} onClick={onDone} />
                // }, [imageShapeId, onDone]),
            }}
        />
    )
}

/**
 * When we export, we'll only include the bounds of the image itself, so show an overlay on top of
 * the canvas to make it clear what will/won't be included. Check `image-annotator.css` for more on
 * how this works.
 */
const ImageBoundsOverlay = track(function ImageBoundsOverlay({
    imageShapeId,
}: {
    imageShapeId: TLShapeId
}) {
    const editor = useEditor()
    const image = editor.getShape(imageShapeId) as TLImageShape
    if (!image) return null

    const imagePageBounds = editor.getShapePageBounds(imageShapeId)!
    const viewport = editor.getViewportScreenBounds()
    const topLeft = editor.pageToViewport(imagePageBounds)
    const bottomRight = editor.pageToViewport({ x: imagePageBounds.maxX, y: imagePageBounds.maxY })

    const path = [
        // start by tracing around the viewport itself:
        `M ${-10} ${-10}`,
        `L ${viewport.maxX + 10} ${-10}`,
        `L ${viewport.maxX + 10} ${viewport.maxY + 10}`,
        `L ${-10} ${viewport.maxY + 10}`,
        `Z`,

        // then cut out a hole for the image:
        `M ${topLeft.x} ${topLeft.y}`,
        `L ${bottomRight.x} ${topLeft.y}`,
        `L ${bottomRight.x} ${bottomRight.y}`,
        `L ${topLeft.x} ${bottomRight.y}`,
        `Z`,
    ].join(' ')

    return (
        <SVGContainer className="ImageOverlayScreen">
            <path d={path} fillRule="evenodd" />
        </SVGContainer>
    )
})

// function DoneButton({
//     imageShapeId,
//     onClick,
// }: {
//     imageShapeId: TLShapeId
//     onClick(result: Blob): void
// }) {
//     const editor = useEditor()
//     return (
//         <button
//             className="DoneButton"
//             onClick={async () => {
//                 const blob = await exportToBlob({
//                     editor,
//                     ids: Array.from(editor.getCurrentPageShapeIds()),
//                     format: 'png',
//                     opts: {
//                         background: true,
//                         bounds: editor.getShapePageBounds(imageShapeId)!,
//                         padding: 0,
//                         scale: 1,
//                     },
//                 })

//                 onClick(blob)
//             }}
//         >
//             Done
//         </button>
//     )
// }


