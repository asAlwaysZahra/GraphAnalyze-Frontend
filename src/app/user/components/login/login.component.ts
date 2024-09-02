import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { Data, DataSet, Edge, Network, Node } from 'vis';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/User';
import { ThemeService } from '../../../shared/services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../../shared/services/loading.service';
import { DangerSuccessNotificationComponent } from '../../../shared/components/danger-success-notification/danger-success-notification.component';
import { getOptions, GRAPH_EDGES, GRAPH_NODES } from './login-graph';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('network') el!: ElementRef;
  private networkInstance!: Network;
  hide = signal(true);
  checked = false;
  username = '';
  password = '';
  isLoading = false;
  isRecoverMode = true;
  login_container!: HTMLElement;
  recover_email = '';
  isTrueRecoverCode = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService,
  ) {
    this.loadingService.setLoading(false);
  }

  changeTheme() {
    this.themeService.changeThemeState();
    this.themeService.theme$.subscribe((data) => {
      const themeChanger = document.getElementById(
        'theme-changer-icon',
      ) as HTMLElement;
      themeChanger.textContent = data === 'dark' ? 'light_mode' : 'dark_mode';
      this.networkInstance.setOptions({
        nodes: {
          font: {
            color: data === 'dark' ? 'rgba(255,255,255,0.9)' : '#424242',
          },
        },
      });
    });
  }

  loginClick() {
    this.isLoading = true;
    this.loadingService.setLoading(true);

    const loginRequest: LoginRequest = {
      username: this.username,
      password: this.password,
      rememberMe: this.checked,
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this._snackBar.openFromComponent(DangerSuccessNotificationComponent, {
          data: 'Logged in successfully.',
          panelClass: ['notification-class-success'],
          duration: 2000,
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.loadingService.setLoading(false);
        this._snackBar.openFromComponent(DangerSuccessNotificationComponent, {
          data: error.error.message,
          panelClass: ['notification-class-danger'],
          duration: 2000,
        });
      },
    });
  }

  hidePassClick(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngAfterViewInit() {
    const dataSetValue = document.body.getAttribute('data-theme');
    const labelColor: string =
      dataSetValue == 'dark' ? 'rgba(255,255,255,0.9)' : '#424242';

    const container = this.el.nativeElement;

    this.createGraph(labelColor, container);
  }

  private createGraph(labelColor: string, container: HTMLElement) {
    // create some nodes
    const nodes = new DataSet<Node>(GRAPH_NODES as unknown as Node[]);
    // create some edges
    const edges = new DataSet<Edge>(GRAPH_EDGES as Edge[]);

    const data: Data = { nodes, edges };

    // create a network
    this.networkInstance = new Network(container, data, getOptions(labelColor));

    this.networkInstance.moveTo({
      animation: true,
      scale: 0.1,
    });
  }

  changeRecoverLoginMode() {
    this.isRecoverMode = !this.isRecoverMode;
  }

  recoverClick() {
    console.log(1);
  }

  sendCodeClick() {
    console.log(2);
    this.isTrueRecoverCode = true;
  }
}
