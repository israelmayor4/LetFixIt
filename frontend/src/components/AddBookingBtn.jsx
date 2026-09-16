import { useNavigate } from "react-router-dom";

function AddBookingBtn({text}) {
    const navigate = useNavigate();

    return (
        <button
            className="add-booking-btn"
            onClick={() => navigate("/booking?action=book")}
        >
            {text || "Book a Service"}
        </button>
    );
}

export default AddBookingBtn;