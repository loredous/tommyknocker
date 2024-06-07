import { Component } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { RouterOutlet, RouterModule } from '@angular/router';
import '@cds/core/icon/register.js';
import { ClarityIcons, cogIcon, lockIcon, copyToClipboardIcon, infoStandardIcon } from '@cds/core/icon';

ClarityIcons.addIcons(lockIcon, cogIcon, copyToClipboardIcon, infoStandardIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ClarityModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tommyknocker';

  toggleTheme() {
    document.body.getAttribute('cds-theme') == 'dark' ? document.body.setAttribute('cds-theme', 'light') : document.body.setAttribute('cds-theme', 'dark');
  }
  
}
