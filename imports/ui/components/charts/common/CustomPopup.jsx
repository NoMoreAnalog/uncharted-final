import {Popup} from 'semantic-ui-react'
import * as _ from 'lodash';

export default  class CustomPopup extends Popup {
    computePopupStyle(positions) {

        const style = {position: 'absolute'}

        // Do not access window/document when server side rendering
        // if (!isBrowser) return style

        const {offset} = this.props
        const {pageYOffset, pageXOffset} = window
        const {clientWidth, clientHeight} = document.documentElement

        if (_.includes(positions, 'right')) {
            style.right = Math.round(clientWidth - (this.coords.right + pageXOffset))
            style.left = 'auto'
        } else if (_.includes(positions, 'left')) {
            style.left = Math.round(this.coords.left + pageXOffset)
            style.right = 'auto'
        } else {  // if not left nor right, we are horizontally centering the element
            const xOffset = (this.coords.width - this.popupCoords.width) / 2
            style.left = Math.round(this.coords.left + xOffset + pageXOffset)
            style.right = 'auto'
        }

        if (_.includes(positions, 'top')) {
            style.bottom = Math.round(clientHeight - (this.coords.top + pageYOffset))
            style.top = 'auto'
        } else if (_.includes(positions, 'bottom')) {
            style.top = Math.round(this.coords.bottom + pageYOffset)
            style.bottom = 'auto'
        } else {  // if not top nor bottom, we are vertically centering the element
            const yOffset = (this.coords.height + this.popupCoords.height) / 2
            style.top = Math.round(this.coords.bottom + pageYOffset - yOffset)
            style.bottom = 'auto'

            const xOffset = this.popupCoords.width + 8
            if (_.includes(positions, 'right')) {
                style.right -= xOffset
            } else {
                style.left -= xOffset
            }
        }

        if (offset) {
            if (_.isNumber(style.right)) {
                style.right -= offset
            } else {
                style.left -= offset
            }
        }

        style.bottom = style.bottom - 100;

        return style
    }
}