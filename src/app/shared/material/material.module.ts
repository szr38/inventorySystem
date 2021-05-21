import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';





import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';

const MaterialComponets = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  RouterModule,
  MatGridListModule,
  MatBadgeModule,
  MatTabsModule,
  MatDatepickerModule,
  MatStepperModule,
  MatNativeDateModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatRadioModule,
  MatDialogModule,
  MatSnackBarModule,

  MatSortModule,
  MatTreeModule,
  OverlayModule,
  MatSliderModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  CdkTreeModule,
  CdkTableModule,
  CdkStepperModule,
  ScrollingModule,
  PortalModule,
  DragDropModule,
  ClipboardModule,
  A11yModule
];

@NgModule({
  exports: [MaterialComponets],
  imports: [MaterialComponets, CommonModule],
})
export class MaterialModule { }
