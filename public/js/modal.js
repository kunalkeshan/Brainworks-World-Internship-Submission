/**
 * Modal Set up
 */

// DOM Elements
const modal = document.getElementById('modal');
const modalHeader = document.getElementById('modal-header');
const modalContent = document.getElementById('modal-content');
const modalButton = document.getElementById('modal-button');

const MODAL_DISPLAY_DURATION = 6000; // 6 Seconds before modal closes automatically

const hideModal = () => {
    modal.classList.remove('modal-error');
    modal.classList.remove('modal-success');
}

/**
 * 
 * @param {options} object Modal Options
 * @param {options.header} string Modal Header
 * @param {options.content} string Modal Content 
 * @param {options.type} string Modal Type // Error or Success
 * @default options.type = 'error'
 */
export const showModal = ({header = "Error!", content = "", type="error"}) => {
    modalHeader.innerText = header;
    modalContent.innerText = content;
    type === "error" ? modal.classList.add('modal-error') : modal.classList.add('modal-success');
    setTimeout(() => {
        hideModal();
    }, MODAL_DISPLAY_DURATION);
};

modalButton.addEventListener("click", () => {
    hideModal();
});
