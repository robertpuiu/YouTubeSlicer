import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

export const getPlaylistFromDB = async (docId) => {
  try {
    const playlistDocRef = doc(db, 'TrimedPlaylists', docId);

    const playlistSnapshot = await getDoc(playlistDocRef);

    if (playlistSnapshot.exists()) {
      return playlistSnapshot.data();
    } else {
      console.log('~~No playlist for provided Id~~');
      return null;
    }
  } catch (e) {
    console.error('Error getting playlist:  ', e);
    return null;
  }
};
