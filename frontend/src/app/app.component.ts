import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { applyBrowserClasses, checkBrowserCompatibility, logBrowserInfo } from './core/utils/browser-detection.utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit(): void {
    // Apply browser-specific classes for CSS targeting
    applyBrowserClasses();

    // Check browser compatibility
    const compatibility = checkBrowserCompatibility();
    if (!compatibility.compatible && compatibility.message) {
      console.warn('Browser Compatibility Warning:', compatibility.message);
      // Optionally show a user-facing warning
      // this.showCompatibilityWarning(compatibility.message);
    }

    // Log browser info in development mode
    if (!this.isProduction()) {
      logBrowserInfo();
    }
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
  }
}
