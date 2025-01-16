

import { useEffect, useState } from 'react'
import 'tldraw/tldraw.css'
import { ImageAnnotationEditor } from './ImageAnnotationEditor'
import './image-annotator.css'
import { AnnotatorImage } from './types'

type State =
    | {
        phase: 'annotate'
        id: string
        image: AnnotatorImage
    }
    | {
        phase: 'export'
        result: Blob
    }

export function ImageAnnotatorWrapper({
    image
}: {
    image: AnnotatorImage | null
}) {
    const [state, setState] = useState<State | null>(null)

    // Add an effect to update the state when image changes
    useEffect(() => {
        if (image) {
            setState({
                phase: 'annotate',
                image,
                id: Math.random().toString(36)
            })
        } else {
            setState(null)
        }
    }, [image])

    if (!state) {
        return <div className="ImageAnnotator">No image provided.</div>
    }

    switch (state.phase) {
        case 'annotate':
            return (
                <div className="ImageAnnotator">
                    <ImageAnnotationEditor
                        key={state.id}
                        image={state.image}
                        onDone={(result) => setState({ phase: 'export', result })}
                    />
                </div>
            )
        case 'export':
            return (
                <div className="ImageAnnotator">
                    <div>Exporting image...</div>
                </div>
            )
    }
}

export default function App({
    imageToAnnotate
}: {
    imageToAnnotate: { sessionId: string; filename: string } | null
}) {
    const [image, setImage] = useState<AnnotatorImage | null>(null)

    useEffect(() => {
        if (imageToAnnotate) {
            const newImage: AnnotatorImage = {
                src: imageToAnnotate,
                width: 300,
                height: 150,
                type: 'image/jpeg',
            }

            console.log('New Image:', newImage);

            setImage(newImage)
        } else {
            setImage(null)
        }
    }, [imageToAnnotate])

    if (!imageToAnnotate) {
        return <div className="App">No image to annotate.</div>
    }

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <ImageAnnotatorWrapper image={image} />
        </div>
    )
}