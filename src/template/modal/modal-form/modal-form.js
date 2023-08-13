import { Modal } from "../../../components/modal/modal";

new Modal({
    name: 'form',
    setup($modal){

    },
    onOpen($root, data, $trigger) {
        if (Object.keys(data).length) {
            if (data.modalTitle)    {
                $($root).find('[name="form-title"]').val('PopUp: ' + data.modalTitle)
                $($root).find('[data-modal-title]').text(data.modalTitle)
            }
            else {
                const textTitle = $($root).find('[data-modal-title]').data('modal-title')
                $($root).find('[name="form-title"]').val('PopUp: ' + textTitle)
                $($root).find('[data-modal-title]').text(textTitle)
            }
            if (data.info)        {
                $($root).find('[name="info"]').val(data.info)}
        }
    },
    onClose($root) {
        $($root).find('[name="info"]').val('')
    },
})