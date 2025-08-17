import Section from '../Section/Section';
import Container from '../Container/Container';
import Form from '../Form/Form';
import { getPhotos } from '../../services/photos';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const onSubmit = async (query: string) => {
    setIsEmpty(false);
    setIsLoading(true);
    try {
      const data = await getPhotos(query);
      if (!data.length) {
        setIsEmpty(true);
        return;
      }
      setPhotos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const handleSelectedPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  }

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && <PhotosGallery photos={photos} onClick = {()=>handleSelectedPhoto} />}
          {isLoading && <Loader />}
          {isEmpty && <Text textAlign="center">Nothing found...</Text>}
        </Container>
      </Section>
      {isModalOpen && selectedPhoto &&
        <Modal onClose={closeModal}>
        <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
        </Modal>}
    </>
  )
}