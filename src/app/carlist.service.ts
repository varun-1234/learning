import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
export interface Cars { Created_date: string , Engine_size:string , Make:string ,Max_speed:string }
@Injectable({
  providedIn: 'root'
})
export class CarlistService {
  private carlist: AngularFirestoreCollection<Cars>;
  list: Observable<Cars[]>;
  constructor( private firestore: AngularFirestore ) { 
  }

  getCarlist() { 
  this.carlist=this.firestore.collection<Cars>("fruit");
  this.list=this.carlist.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Cars;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  return this.list;
  }

  update(id: string, data: any): Promise<void> {
    return this.carlist.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.carlist.doc(id).delete()
  }
  create(data: Cars): any {
    return this.carlist.add({ ...data });
  }
  
}
