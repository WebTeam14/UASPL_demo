const UploadComplianceModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 w-96 rounded">
                <h3 className="text-lg font-semibold mb-4">
                    Upload Compliance
                </h3>

                <input className="w-full mb-2 border p-1" placeholder="Compliance Name" />
                <input type="date" className="w-full mb-2 border p-1" />
                <input type="file" className="w-full mb-4" />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button className="px-4 py-1 bg-blue-600 text-white rounded">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadComplianceModal;
