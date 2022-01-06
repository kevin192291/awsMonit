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

export interface UserData {
  id: string;
  name: string;
  publicIp: string;
  privateIp: string;
  state: string;
  type: string;
}


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
  ngOnInit(): void { }

  displayedColumns: string[] = ['id', 'name', 'publicIp', 'privateIp', 'state', 'type'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private afs: Firestore) {
  }

  async ngAfterViewInit() {
    await collectionData<any>(
      query<any>(
        collection(this.afs, 'servers') as CollectionReference<any>,
        orderBy('id'),
        limit(5),
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async onPage($event: any) {
    console.log(this.pageEvent);
    if (this.currentPage < $event.pageIndex) {
      await collectionData<any>(
        query<any>(
          collection(this.afs, `servers`) as CollectionReference<any>,
          orderBy('id'),
          startAfter(this.lastId),
          limit(5),
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
          limitToLast(5),
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

  sortData($event: any) {
    console.log($event);
  }

}
