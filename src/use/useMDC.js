//import {MDCRipple} from '@material/ripple';
//import {MDCTextField} from '@material/textfield';

export default function useMDC() {

  const init = () => {
    const textFields = document.querySelectorAll('.mdc-text-field');
    console.log(mdc)
    for (const textField of textFields) {
      mdc.textField.MDCTextField.attachTo(textField);
      //new MDCTextField(textField);
    }
    const buttons = document.querySelectorAll('.mdc-button');
    for (const button of buttons) {
      mdc.ripple.MDCRipple.attachTo(button);
      //new MDCRipple(button);
    }

  }

  return {
    init
  }

}