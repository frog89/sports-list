import { Injectable } from '@angular/core';
import { IPlayer } from './model/player.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction, DocumentReference, SetOptions } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { PlayDay } from 'src/app/shared/model/playday.model';
import { QueryFn } from 'angularfire2/firestore'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  getPlayers(aLoadInactive: boolean) : Observable<DocumentChangeAction<IPlayer>[]> {
    //return this.afs.collection<Player>('player', 
    //  ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    //return this.afs.collection<IPlayer>('/Players', ref => 
    //  ref.orderBy("lastname").orderBy("firstname")).
    //  valueChanges();
    let queryFn: QueryFn | undefined = ref => ref.where('isActive', '==', true);
    if (aLoadInactive) {
      queryFn = undefined;
    }
    return this.afs.collection<IPlayer>('Players', queryFn).snapshotChanges();
  }

  insertPlayer(player: IPlayer): void {
    var newId =  this.afs.createId();
    player.id = newId;
    let doc: AngularFirestoreDocument<IPlayer> = this.afs.collection<IPlayer>('Players').doc<IPlayer>(newId);
    let playerObj: IPlayer = Object.assign({}, player);
    doc.set(playerObj);
  }

  updatePlayer(player: IPlayer): void {
    let doc: AngularFirestoreDocument<IPlayer> = this.afs.doc<IPlayer>(`Players/${player.id}`);
    let playerObj: IPlayer = Object.assign({}, player);
    doc.update(playerObj);
  }

  deletePlayer(aId: string): void {
    let id: string = aId;
    let doc: AngularFirestoreDocument<IPlayer> = this.afs.doc<IPlayer>(`Players/${id}`);
    doc.delete();
  }

  getPlayDays() : Observable<PlayDay[]> {
    //return this.afs.collection<Player>('player', 
    //  ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    return this.afs.collection<PlayDay>('PlayDays').valueChanges();
  }

  getPlayDay(aId: string) : Observable<PlayDay[]> {
    //return this.afs.collection<Player>('player', 
    //  ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    return this.afs.collection<PlayDay>('PlayDays', 
      ref => ref.where('id', '==', aId)).valueChanges();
  }
  
  /*
  postsCol: AngularFirestoreCollection<Post>;
  //posts: Observable<Post[]>;
  posts: Observable<PostId[]>;
  postDoc: AngularFirestoreDocument<Post>;
  singlePost: Observable<Post>;
  title:string;
  content:string;

  constructor(private afs: AngularFirestore) {}
  
    getPlayers() : Player {
      return this.afs.collection<Player>('player', 
      ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    }
    //this.postsCol = this.afs.collection('posts');
    return this.afs.collection<Player>('posts', 
      ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    //this.posts = this.postsCol.valueChanges();
    this.posts = this.postsCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data } as PostId;
        });
      }));
  }

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content});
    //this.afs.collection('posts').doc('my-custom-id').set({'title': this.title, 'content': this.content});
  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.singlePost = this.postDoc.valueChanges();
  }

  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }
  */
}
