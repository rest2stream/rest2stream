//import {MDCRipple} from '@material/ripple';
//import {MDCTextField} from '@material/textfield';

export default function useMDC() {


  const buttonInit = () => {
    const buttons = document.querySelectorAll('.mdc-button');
    for (const button of buttons) {
      mdc.ripple.MDCRipple.attachTo(button);
      //new MDCRipple(button);
    }
  }

  const textFieldInit = () => {
    const textFields = document.querySelectorAll('.mdc-text-field');
    console.log(mdc)
    for (const textField of textFields) {
      mdc.textField.MDCTextField.attachTo(textField);
      //new MDCTextField(textField);
    }
  }

  const drawerInit = () => {
    const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    const appBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
    appBar.setScrollTarget(document.getElementById('main-content'));
    appBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;
    });
  }

  return {
    textFieldInit,
    buttonInit,
    drawerInit
  }

}