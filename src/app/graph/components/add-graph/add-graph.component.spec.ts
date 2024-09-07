import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AddGraphComponent } from './add-graph.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Papa } from 'ngx-papaparse';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of, throwError } from 'rxjs';
import { AddGraphService } from '../../services/add-graph/add-graph.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { DangerSuccessNotificationComponent } from '../../../shared/components/danger-success-notification/danger-success-notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DashboardHeaderComponent } from '../../../shared/components/dashboard-header/dashboard-header.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

describe('AddGraphComponent', () => {
  let component: AddGraphComponent;
  let fixture: ComponentFixture<AddGraphComponent>;
  let mockAddGraphService: jasmine.SpyObj<AddGraphService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let papaParseService: jasmine.SpyObj<Papa>;
  const mockFile = new Blob(['name,category\nA,Category1'], {
    type: 'text/csv',
  });
  const event = {
    target: { files: [new File([mockFile], 'test.csv')] },
  } as unknown as Event;

  const mockReader = {
    readAsText: jasmine.createSpy('readAsText'),
    result: '',
    onload: null as unknown as (ev: ProgressEvent<FileReader>) => never,
    onerror: null,
    onabort: null,
    readyState: FileReader.DONE,
    abort: jasmine.createSpy('abort'),
    error: null,
  } as unknown as FileReader;

  beforeEach(async () => {
    mockAddGraphService = jasmine.createSpyObj('AddGraphService', [
      'getCategories',
      'uploadNode',
      'uploadEdge',
    ]);
    mockLoadingService = jasmine.createSpyObj('LoadingService', ['setLoading']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    papaParseService = jasmine.createSpyObj('Papa', ['parse']);

    await TestBed.configureTestingModule({
      declarations: [
        AddGraphComponent,
        DangerSuccessNotificationComponent,
        DashboardHeaderComponent,
        CardComponent,
      ],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatRadioModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: AddGraphService, useValue: mockAddGraphService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Papa, useValue: papaParseService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGraphComponent);
    component = fixture.componentInstance;

    mockAddGraphService.getCategories.and.returnValue(
      of({
        paginateList: [{ id: 1, name: 'Category1', totalNumber: 100 }],
        pageIndex: 0,
        totalCount: 1,
      }),
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Drop file here" and "Browse" in normal state', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dropFileText = compiled.querySelector(
      '.formbold-drop-file',
    )?.textContent;
    const browseText = compiled.querySelector('.formbold-browse')?.textContent;

    expect(dropFileText).toContain('Drop file here');
    expect(browseText).toContain('Browse');
  });

  it('should highlight the file input area on dragover', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const fileInputDiv = compiled.querySelector('.formbold-file-input');

    if (fileInputDiv) {
      const dragOverEvent = new Event('dragover');
      fileInputDiv.dispatchEvent(dragOverEvent);
      fixture.detectChanges();

      expect(component.isHighlighted).toBeTrue();
      expect(fileInputDiv.classList).toContain('isHighlighted');
    } else {
      fail('file input div not found');
    }
  });

  it('should handle uploadNode success and reset form', () => {
    component.selectedFile = new File([], 'test.csv');
    component.csvType = 'node';
    mockAddGraphService.uploadNode.and.returnValue(of({}));

    component.uploadFile();
    fixture.detectChanges();

    expect(mockAddGraphService.uploadNode).toHaveBeenCalled();
    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      DangerSuccessNotificationComponent,
      {
        data: 'Node added successfully!',
        panelClass: ['notification-class-success'],
        duration: 2000,
      },
    );

    expect(component.csvData.length).toBe(0);
  });

  it('should handle uploadNode error and display error notification', () => {
    component.selectedFile = new File([], 'test.csv');
    component.csvType = 'node';
    const errorResponse = { error: { message: 'Upload failed' } };
    mockAddGraphService.uploadNode.and.returnValue(
      throwError(() => errorResponse),
    );

    component.uploadFile();
    fixture.detectChanges();

    expect(mockAddGraphService.uploadNode).toHaveBeenCalled();
    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      DangerSuccessNotificationComponent,
      {
        data: 'Upload failed',
        panelClass: ['notification-class-danger'],
        duration: 2000,
      },
    );
  });

  it('should correctly upload and parse a valid CSV file', fakeAsync(() => {
    spyOn(window, 'FileReader').and.returnValue(mockReader);

    papaParseService.parse.and.returnValue({
      data: [{ name: 'A', category: 'Category1' }],
      meta: {
        fields: ['name', 'category'],
        delimiter: ',',
        linebreak: '\n',
        aborted: false,
        truncated: false,
      },
      errors: [],
    });

    component.readFile(event);
    expect(mockReader.readAsText).toHaveBeenCalledWith(jasmine.any(File));

    if (mockReader.onload) {
      mockReader.onload({
        target: { result: 'name,category\nA,Category1' } as FileReader,
      } as ProgressEvent<FileReader>);
    }

    tick();
    fixture.detectChanges();

    expect(component.csvData).toEqual([{ name: 'A', category: 'Category1' }]);
    expect(component.headers).toEqual(['name', 'category']);
    expect(component.isLoaded).toBeTrue();
    expect(component.displayedColumns).toEqual(['name', 'category']);
    expect(component.dataSource.data).toEqual([
      { name: 'A', category: 'Category1' },
    ]);
  }));
});
