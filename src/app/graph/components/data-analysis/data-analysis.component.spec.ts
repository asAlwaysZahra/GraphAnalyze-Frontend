import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAnalysisComponent } from './data-analysis.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchNodesComponent } from './search-nodes/search-nodes.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadGraphService } from '../../services/load-graph/load-graph.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../../../shared/services/loading.service';
import { ThemeService } from '../../../shared/services/theme.service';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { AllNodes } from '../../model/graph';

fdescribe('DataAnalysisComponent', () => {
  let component: DataAnalysisComponent;
  let fixture: ComponentFixture<DataAnalysisComponent>;
  let searchComponent: SearchNodesComponent;
  let searchFixture: ComponentFixture<SearchNodesComponent>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockLoadGraphService: jasmine.SpyObj<LoadGraphService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let themeSubject: BehaviorSubject<string>;
  let nodesData: Subject<AllNodes>;

  beforeEach(async () => {
    mockMatSnackBar = jasmine.createSpyObj<MatSnackBar>(['openFromComponent']);
    mockLoadGraphService = jasmine.createSpyObj<LoadGraphService>([
      'getGraph',
      'getNodeInfo',
    ]);
    mockMatDialog = jasmine.createSpyObj<MatDialog>(['open']);
    mockLoadingService = jasmine.createSpyObj<LoadingService>(['setLoading']);
    themeSubject = new BehaviorSubject<string>('light');

    nodesData = new Subject<AllNodes>();

    await TestBed.configureTestingModule({
      declarations: [DataAnalysisComponent, SearchNodesComponent],
      imports: [
        MatFormFieldModule,
        MatPaginatorModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
        SharedModule,
        MatSelectModule,
        FormsModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        {
          provide: LoadGraphService,
          useValue: {
            mockLoadGraphService,
            nodesData$: nodesData.asObservable(),
            getAllNodes: jasmine
              .createSpy('getAllNodes')
              .and.returnValue(of({})),
          },
        },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: LoadingService, useValue: mockLoadingService },
        {
          provide: ThemeService,
          useValue: { theme$: themeSubject.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAnalysisComponent);
    searchFixture = TestBed.createComponent(SearchNodesComponent);
    component = fixture.componentInstance;
    searchComponent = searchFixture.componentInstance;
    component.ngAfterViewInit();
    searchComponent.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('colors SHOULD change WHEN theme changes', () => {
    expect(component.isDarkMode).toBeFalse();
    themeSubject.next('dark');
    expect(component.isDarkMode).toBeTrue();
  });
});
