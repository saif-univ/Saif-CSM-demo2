"use client"
import React, { useEffect, useState } from "react";
import CapturedImagesList from "@/app/ui/surgical-session/sidepanel/CapturedImagesList";
import CapturedVideosList from "@/app/ui/surgical-session/sidepanel/CapturedVideosList";
import { ImageMetadata } from "@/app/types/imageTypes";
import { RecordedFile } from "@/app/types/recordedFile";
import { DocumentCheckIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

export const LocalDisplay: React.FC<{ onSelectPdf: (pdf: any) => void }> = ({ onSelectPdf ,resource}) => {
    
    
    
    //const renderDocumentList = (patientName: string, documentType: 'medical' | 'dicom') => {
  const patientDocs = [
    "CBC Lab Report",
    "Discharge Summary",
    "Liver Profile",
    "MRI Reports FINAL 928",
    "Path Lab Report"];
  
      return (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {patientDocs.map((doc,index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <DocumentCheckIcon className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium break-all w-40">{doc}</p>
                  <button
                  onClick={() => onSelectPdf(doc)}
                  className="text-blue-500 hover:bg-blue-100 p-1 rounded"
                >
                  <EyeIcon className="h-5 w-5 justify-between" />
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    //};
}