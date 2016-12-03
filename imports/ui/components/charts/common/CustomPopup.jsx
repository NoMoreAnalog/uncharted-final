import {Popup} from 'semantic-ui-react'

export default  class CustomPopup extends Popup {
    computePopupStyle(positions) {

        const style = {};
        const {pageXOffset} = window
        const xOffset = (this.coords.width - this.popupCoords.width) / 2

        style.left = Math.round(this.coords.left + xOffset + pageXOffset)
        style.right = 'auto'
        style.top = '200px'
        style.position = 'absolute'

        return style

    }
}