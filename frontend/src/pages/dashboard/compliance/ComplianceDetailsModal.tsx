import { Compliance } from "./types";

const ComplianceDetailsModal = ({
    compliance,
    onClose,
}: {
    compliance: Compliance;
    onClose: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 w-96 rounded">
                <h3 className="text-lg font-semibold mb-4">
                    Compliance Details
                </h3>

                <p><b>Name:</b> {compliance.name}</p>
                <p><b>Uploaded By:</b> {compliance.uploadedBy}</p>
                <p><b>Department:</b> {compliance.department}</p>
                <p><b>Expiry:</b> {compliance.expiryDate}</p>

                <div className="mt-4 text-right">
                    <button onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComplianceDetailsModal;
