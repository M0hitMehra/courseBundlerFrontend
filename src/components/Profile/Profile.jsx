import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { updatProfilePicture } from '../../redux/actions/profile';
import { cancelSubscription, loadUser } from '../../redux/actions/userAction';
import { toast } from 'react-hot-toast';
import { removeFromPlaylist } from '../../redux/actions/course';

const Profile = ({ user }) => {
 const dispatch = useDispatch();

  const {loading,message,error} = useSelector(state=>state.profile)
  const {loading : subscriptionLoading ,message :subscriptionMessage ,error :subscriptionError } = useSelector(state=>state.subscription)
   const removeFromPlaylistHandler = async ( id) => {
    await dispatch(removeFromPlaylist(id))
    dispatch(loadUser())
  };
  


  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('file', image);

    await dispatch(updatProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = ()=>{
    dispatch(cancelSubscription())
  }

  const { isOpen, onClose, onOpen } = useDisclosure();

  
  useEffect(() => {
    if(error) {
     toast.error(error)
     dispatch({type:"clearError"})
    }
    if(message) {
     toast.success(message)
     dispatch({type:"clearMessage"})
    }

    if(subscriptionError){
      toast.error(subscriptionError)
     dispatch({type:"clearError"})
    }

    if(subscriptionMessage) {
      toast.success(subscriptionMessage)
      dispatch({type:"clearMessage"})
    dispatch(loadUser())

     }

   }, [dispatch,error,message ,subscriptionError,subscriptionMessage])
   

   
  return (
    <Container minH={'95vh'} maxW={'container.lg'} py={8}>
      <Heading children="Profile" m={8} textTransform={'uppercase'} />

      <Stack
        justifyContent={'flex-start'}
        alignItems={'center'}
        direction={['column', 'row']}
        spacing={[8, 16]}
        padding={8}
      >
        <VStack>
          <Avatar boxSize={48} src={user.avatar.url} />
          <Button isLoading={loading} onClick={onOpen} colorScheme="yellow" variant={'ghost'}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={4} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name</Text>

            <Text>{user.name}</Text>
          </HStack>

          <HStack>
            <Text fontWeight={'bold'}>Email</Text>

            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Created At</Text>

            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === 'active' ? (
                <Button isLoading={subscriptionLoading} onClick={cancelSubscriptionHandler} variant={'unstyled'} color="yellow.500">
                  Cancel Subscription
                </Button>
              ) : (
                <Link to={'/subscribe'}>
                  <Button colorScheme="yellow">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack alignItems={'center'} direction={['column', 'row']}>
            <Link to={'/updateprofile'}>
              <Button> Update Profile</Button>
            </Link>
            <Link to={'/changepassword'}>
              <Button>Change Password </Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Playlist" size={'md'} my={8} />
      {user.playlist.length > 0 && (
        <Stack
          alignItems={'center'}
          direction={['column', 'row']}
          flexWrap={'wrap'}
          p={4}
        >
          {user.playlist.map((element, index) => (
            <VStack w={48} m={2} key={element.course}>
              <Image
                boxSize={'full'}
                objectFit={'contain'}
                src={element.poster}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button
                isLoading={loading}
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />{' '}
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
        changeImageSubmitHandler={changeImageSubmitHandler}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler ,loading}) {
  const [imgPrev, setImgPrev] = useState('');
  const [image, setImage] = useState();

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler = () => {
    onClose();
    setImgPrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={''} />
      <ModalContent>
        <ModalHeader>Change Profile Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={8}>
                {imgPrev && <Avatar src={imgPrev} boxSize={48} />}
                <Input
                  type="file"
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />
                <Button  isLoading={loading}  type="submit" colorScheme="yellow" w={'full'}>
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
