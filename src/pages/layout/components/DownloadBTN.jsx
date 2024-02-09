import React from "react";
import { useDownloadMaterialQuery } from "../../../services/aspiAPI";

const DownloadBTN = ({ MaterialId, fileFormat = "" }) => {
    // ---------------------------------------------------------
    // ======================== APIS ========================
    const {
        isError: isErrorDownload,
        error: errorDownload,
        isFetching: isFetchingDownload,
        isLoading: isLoadingDownload,
        isSuccess: isSuccessDownload,
        data: dataDownload,
        refetch: refetchDownload,
        currentData: currentDataDownload,
    } = useDownloadMaterialQuery(MaterialId);

    // ======================== End APIS ========================
    // *********************************************************

    // ---------------------------------------------------------
    // ======================== Handlers ========================
    const downloadFile = () => {
        if (dataDownload && dataDownload.blob) {
            const url = window.URL.createObjectURL(
                new Blob([dataDownload.blob], {
                    type: dataDownload.contentType,
                })
            );
            const link = document.createElement("a");
            link.href = url;

            let fileName = "downloaded_file";
            if (dataDownload.contentDisposition) {
                const fileNameMatch =
                    dataDownload.contentDisposition.match(/filename="?(.+)"?/);
                if (fileNameMatch && fileNameMatch.length === 2)
                    fileName = fileNameMatch[1];
            }
            link.setAttribute("download", fileName);

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        }
    };
    // ======================== End Handlers ========================
    // *********************************************************
    return (
        <div className="flex flex-col items-center justify-center">
            <button
                className="p-2 text-white btn btn-primary"
                onClick={() => downloadFile()}
                disabled={
                    isFetchingDownload || isLoadingDownload || isErrorDownload
                }
            >
                <span className="block">{fileFormat}</span>
            </button>
            <span className="block text-xs underline">Click to download</span>
        </div>
    );
};

export default DownloadBTN;
