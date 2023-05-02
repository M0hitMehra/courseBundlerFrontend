import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import cursor from '../../../assests/images/cursor1.cur';
import SideBar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {
  const {isOpen ,onClose , onOpen } = useDisclosure()
  const [courseId, setCourseId] = useState("")
  const [courseTitle, setCourseTitle] = useState("")
   
  const courseDetailsHandler = (courseId,courseTitle)=>{
    dispatch(getCourseLectures(courseId))
    onOpen()
    setCourseId(courseId)
    setCourseTitle(courseTitle)
  }
  const deleteButtonHandler = (courseId )=>{
    dispatch(deleteCourse(courseId ))
  }
  const deleteLectureButtonHandler = async(courseId,lectureId)=>{
   await dispatch(deleteLecture(courseId,lectureId))
   dispatch(getCourseLectures(courseId))

  }
  const addLectureButtonHandler =async ( e,courseId, title,description,video)=>{
    e.preventDefault()
    const myForm = new FormData()
    myForm.append('title',title)
    myForm.append('description',description)
    myForm.append('file',video)

   await dispatch(addLecture(courseId, myForm))
   dispatch(getCourseLectures(courseId))
  }
  const {courses ,lectures   } =  useSelector(state=>state.course)
  const { loading, error,message } =  useSelector(state=>state.admin)
       
  const dispatch = useDispatch()
  useEffect(() => {
    
    dispatch(getAllCourses())
    if(error) {
      toast.error(error)
      dispatch({type:"clearError"})
     }
     if(message) {
      toast.success(message)
      dispatch({type:"clearMessage"})
     }
    
  }, [dispatch,message,error])
  
  return (
    <Grid
      css={{ cursor: `url(${cursor}),default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={[0,8]} overflowX={'auto'} >
      <Heading
            textTransform={'uppercase'}
            children="All Courses"
            my={16}
            textAlign={['center', 'left']}
          />
          <TableContainer w={['100vw','full']} >
            <Table variant={'simple'} size={'lg'} >
              <TableCaption>All available courses in the database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Creator</Th>
                  <Th isNumeric >Views</Th>
                  <Th isNumeric >Lectures</Th>
                  <Th isNumeric >Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  courses.map(item =>(
                    <Row loading={loading}  key={item._id} item={item} courseDetailsHandler={courseDetailsHandler} deleteButtonHandler={deleteButtonHandler} />
                  ))
                }
              </Tbody>
            </Table>

          </TableContainer>
          <CourseModal loading={loading} isOpen={isOpen} onClose={onClose} courseTitle={courseTitle} id={courseId} deleteButtonHandler={deleteLectureButtonHandler} addLectureButtonHandler={addLectureButtonHandler} lectures={lectures}  />
      </Box>
      <SideBar />
    </Grid>
  );
};



function Row({item ,courseDetailsHandler , deleteButtonHandler,loading }){
  return(
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'} >{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric >{item.views}</Td>
      <Td isNumeric >{item.numOfVideos}</Td>

      <Td isNumeric >
        <HStack justifyContent={'flex-end'} >
          <Button isLoading={loading}  onClick={()=>courseDetailsHandler(item._id ,item.title)} variant={'outline'} color={'purple.500'} >View Lectures</Button>
          <Button isLoading={loading} onClick={()=>deleteButtonHandler(item._id)} color={'purple.600'}> <RiDeleteBin7Fill/> </Button>
        </HStack>
      </Td>
    </Tr>
  )
}

export default AdminCourses