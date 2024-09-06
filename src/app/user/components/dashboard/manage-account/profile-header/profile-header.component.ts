import {Component, Input} from '@angular/core';
import {UserInformation} from "../../../../models/ManageUsers";

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  @Input({required: true}) userInfo!: UserInformation;
}
