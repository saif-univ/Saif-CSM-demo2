"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
    UserCircleIcon,
    DocumentPlusIcon,
    DocumentCheckIcon,
    TrashIcon,
    EyeIcon
} from '@heroicons/react/24/outline';

export const RenderPdfModal = ({ selectedPdf, setSelectedPdf }) => {
    if (!selectedPdf) return null;
    console.log("in final dest",selectedPdf);

    return (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[100%] h-[100%] p-4 flex flex-col">
           
            <iframe
                src={`/subjdocs/${selectedPdf}.pdf#toolbar=0&navpanes=0&scrollbar=0`}
                //src={`/subjdocs/CBC-lab-report.pdf#toolbar=0&navpanes=0&scrollbar=0`}
                
                className="flex-grow w-full border-none"
                title="PDF Viewer"
            />
        </div>

        // </div>
    );
};