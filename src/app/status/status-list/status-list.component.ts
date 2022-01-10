import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, take } from 'rxjs/operators';
import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots,
  endAt,
  endBefore,
  limitToLast,
  startAfter,
} from '@angular/fire/firestore';
import { limit, orderBy, setDoc, startAt } from 'firebase/firestore';
import { StatusData } from 'src/app/shared/interfaces/status.interface';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit, AfterViewInit {

  results: any[] = [];
  lastId: string = '';
  firstId: string = '';
  pageEvent!: PageEvent;
  currentPage: number = 0;
  totalItems: number = 0;
  pageSize: number = 5;
  ngOnInit(): void { }

  displayedColumns: string[] = ['id', 'name', 'publicIp', 'privateIp', 'state', 'type'];
  dataSource!: MatTableDataSource<StatusData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private afs: Firestore, private dataService: DataService) {
  }

  async ngAfterViewInit() {
    await collectionData<any>(
      query<any>(
        collection(this.afs, 'servers') as CollectionReference<any>,
        orderBy('id'),
        limit(this.pageSize),
      ),
    ).pipe(take(1)).toPromise().then(data => {
      if (data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.lastId = data[data.length - 1].id;
        this.firstId = data[0].id;
        this.dataSource.sort = this.sort;
        this.pageSize = this.paginator.pageSize;
      } else {
        // add no data found message here or something
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async onPage($event: any) {
    if ($event && this.currentPage < $event.pageIndex) {
      this.pageSize = $event.pageSize;
      this.dataService.getStatusList(this.firstId, this.lastId, this.pageSize).subscribe()
      await collectionData<any>(
        query<any>(
          collection(this.afs, `servers`) as CollectionReference<any>,
          orderBy('id'),
          startAfter(this.lastId),
          limit(this.pageSize),
        ),
      ).pipe(take(1)).toPromise().then(data => {
        if (data.length > 0) {
          this.dataSource = new MatTableDataSource(data);
          this.lastId = data[data.length - 1].id;
          this.firstId = data[0].id;
          this.dataSource.sort = this.sort;
        } else {
          // add no data found message here or something
        }
      });
    } else {
      await collectionData<any>(
        query<any>(
          collection(this.afs, `servers`) as CollectionReference<any>,
          orderBy('id'),
          endBefore(this.firstId),
          limitToLast(this.pageSize),
        ),
      ).pipe(take(1)).toPromise().then(data => {
        if (data.length > 0) {
          this.dataSource = new MatTableDataSource(data);
          this.lastId = data[data.length - 1].id;
          this.firstId = data[0].id;
          this.dataSource.sort = this.sort;
        } else {
          // add no data found message here or something
        }
      });
    }
  }

  private async getDocCount() {
    await collectionData<any>(
      query<any>(
        collection(this.afs, 'servers') as CollectionReference<any>,
      )
    ).pipe(take(1)).toPromise().then(c => {
      console.log(c.length);
      this.totalItems = c.length
    });
  }

  sortData($event: any) {
    console.log($event);
  }

}
