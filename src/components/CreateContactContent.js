import FormRow from './FormRow'
import classes from '../styles/CreateContactContent.module.css'
import { faUser, faEnvelope, faPhone, faGlobe} from "@fortawesome/free-solid-svg-icons";
export default function CreateContactContent() {
  return (
    <>
      <div className={classes.contactEditorContent}>
        <FormRow icon={ faUser } type="text" placeholder="Full Name"/>
        <FormRow icon={ faEnvelope } type="email" placeholder="Email"/>
        <FormRow icon={ faPhone } type="text" placeholder="Phone"/>
        <FormRow icon={ faGlobe } type="text" placeholder="Website"/>
        
        {/* <div class="row">
          <div class="iconColumn">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>
          <div class="inputColumn">
            <input type="email" placeholder="Email" />
          </div>
          <div
            onclick="this.closest('.row').querySelector('input').value = ''"
            class="crossIconColumn"
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>

        <div class="row">
          <div class="iconColumn">
            <i class="fa fa-phone" aria-hidden="true"></i>
          </div>
          <div class="inputColumn">
            <input type="text" placeholder="Phone" />
          </div>
          <div
            onclick="this.closest('.row').querySelector('input').value = ''"
            class="crossIconColumn"
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>

        <div class="row"> 
          <div class="iconColumn">
            <i class="fa fa-globe" aria-hidden="true"></i>
          </div>
          <div class="inputColumn">
            <input type="text" placeholder="Website" />
          </div>
          <div
            onclick="this.closest('.row').querySelector('input').value = ''"
            class="crossIconColumn"
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
  </div> */}
      </div>
    </>
  );
}
