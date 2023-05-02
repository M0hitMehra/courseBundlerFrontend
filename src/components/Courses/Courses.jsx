import {
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/userAction';

const Course = ({
    views,
    title,
    imageSrc,
    id,
    addToPlaylistHandler,
    creator,
    description,
    lectureCount,
    loading
}) => {
    return (
        <VStack className="course" alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
            <Heading
                textAlign={['center', 'left']}
                maxW={'200px'}
                size={'sm'}
                fontFamily={'sans-serif'}
                noOfLines={3}
                children={title}
            />
            <Text noOfLines={2} children={description} />
            <HStack>
                <Text
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    children={'Creator'}
                />
                <Text
                    fontFamily={'body'}
                    textTransform={'uppercase'}
                    children={creator}
                />
            </HStack>
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Lectures - ${lectureCount}`}
                textTransform={'uppercase'}
            />
            <Heading
                size={'xs'}
                children={`Views - ${views}`}
                textTransform={'uppercase'}
            />
            <Stack direction={['column', 'row']}>
                <Link to={`/course/${id}`}>
                    <Button colorScheme="yellow">Watch Now</Button>
                </Link>
                <Button
                isLoading={loading}
                    variant={'ghost'}
                    colorScheme="yellow"
                    onClick={() => addToPlaylistHandler(id)}
                >
                    Add to playlist
                </Button>
            </Stack>
        </VStack>
    );
};

const Courses = () => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState();
    const dispatch = useDispatch();
    const { loading, error, courses,message } = useSelector(state => state.course);

    const categories = [
        'Web Development',
        'Data Structure and Algorithms',
        'App Development',
        'Game Development',
        'Artifical Inteligence',
        'Data Science',
    ];
    const addToPlaylistHandler =async (courseId) => { 
       await dispatch(addToPlaylist(courseId))
       dispatch(loadUser())
    };

    useEffect(() => {
        dispatch(getAllCourses(category, keyword));
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, category, keyword, toast, error,message ]);

    return (
        <Container maxH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
            <Heading children="All Courses" margin={8} />
            <Input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                type={'text'}
                placeholder="Search a course . . ."
                focusBorderColor="yellow.500"
            />
            <HStack
                overflowX={'auto'}
                paddingY={'8'}
                css={{ '&::-webkit-scrollbar': { display: 'none' } }}
            >
                {categories &&
                    categories.map((category, i) => (
                        <Button minW={'60'} key={i} onClick={() => setCategory(category)}>
                            <Text children={category} />
                        </Button>
                    ))}
            </HStack>

            <Stack
                direction={['column', 'row']}
                flexWrap={'wrap'}
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}
            >
                {courses.length > 0 ?courses.map((item) => (
                    <Course
                        title={item.title}
                        description={item.description}
                        views={item.views}
                        imageSrc={
                            item.poster.url
                        }
                        id={item._id}
                        creator={item.createdBy}
                        key={item._id}
                        lectureCount={item.numOfVideos}
                        addToPlaylistHandler={addToPlaylistHandler}
                        loading={loading}
                    />
                )):
                <Heading   mt={4} >Courses Not Found</Heading> 
            }
            </Stack>
        </Container>
    );
};

export default Courses;
