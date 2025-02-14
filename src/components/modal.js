// import "../components/modal.css";

// const Modal = ({ show, closeModalHandler }) => {
//   return (
//     <div
//       className="modal-wrapper"
//       style={{
//         transform: show ? "translateY(0vh)" : "translateY(-100vh)",
//         opacity: show ? "1" : "0",
//       }}
//     >
//       <div className="modal-header">
//         <p>Edit Todo</p>
//         <span onClick={closeModalHandler} className="close-modal-btn">
//           X
//         </span>
//       </div>
//       <div className="modal-content">
//         <div className="modal-body">
//           <h4>Modal</h4>
//           <p>Lorem</p>
//         </div>
//         <div className="modal-footer">
//           <button onClick={closeModalHandler} className="btn-cancel">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, headerText, children }) => {
  const [show, setShow] = useState(isOpen);

  // Close the modal when the background is clicked
  const handleClose = () => {
    onClose();
  };

  // Close the modal when the 'Escape' key is pressed
  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    setShow(isOpen);
    // Add event listener for Escape key
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  if (!show) return null;

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div
        style={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div style={styles.header}>
          <span>{headerText}</span>
          <span style={styles.close} onClick={handleClose}>
            &#x2715;
          </span>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "600px",
    minHeight: "200px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    backdropFilter: "blur(5px)",
    transition: "transform 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  close: {
    cursor: "pointer",
    fontSize: "20px",
  },
  body: {
    fontSize: "16px",
  },
};
