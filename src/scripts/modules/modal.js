import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $('.open-modal');
        this.modal = $('.modal');
        this.closeModalButton = $('.modal__close');
        this.events();
    }

    events() {
        //clicking te open modal button
        this.openModalButton.click(this.openModal.bind(this));
        console.log('TESTTT')
            //clicking the x close modal button
        this.closeModalButton.click(this.closeModal.bind(this));

        //pushes any key
        $(document).keyup(this.keyPressHandler.bind(this));

    }
    keyPressHandler(e) {
        if (e.keyCode == 27) {
            this.closeModal();
        }
        console.log('Key press')
    }

    openModal() {
        this.modal.addClass('modal--is-visible');
        console.log('TESTTT Open modal');
        return false; // do let anchor tag (in this case the button)with # to go to the top of the page 

    }
    closeModal() {
        this.modal.removeClass('modal--is-visible');
    }
}

export default Modal;