import type { Photo } from '../../types/photo';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

interface PhotosGalleryProps {
  photos: Photo[];
  onClick: () => void;
}

export default function PhotosGallery({ photos, onClick }: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <GridItem key={photo.id}>
          <PhotosGalleryItem photo={photo} onClick={ onClick } />
        </GridItem>
      ))}
    </Grid>
  );
}