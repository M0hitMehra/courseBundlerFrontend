import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import cursor from '../../../assests/images/cursor1.cur';
import SideBar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const Users = () => {
   
  const dispatch = useDispatch()
  const updateHandler = (userId)=>{
    dispatch(updateUserRole(userId))
  }
  const deleteButtonHandler = (userId)=>{dispatch(deleteUser(userId))}
  const {users ,loading ,error,message } = useSelector(state=>state.admin)
  useEffect(() => {
    dispatch(getAllUsers())

    if(error) {
      toast.error(error)
      dispatch({type:"clearError"})
     }
     if(message) {
      toast.success(message)
      dispatch({type:"clearMessage"})
     }
  
  }, [dispatch ,error,message])
  

  return (
    <Grid
      css={{ cursor: `url(${cursor}),default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
     {
      (
        <Box p={[0,16]} overflowX={'auto'} >
        <Heading
              textTransform={'uppercase'}
              children="All Users"
              my={16}
              textAlign={['center', 'left']}
            />
            <TableContainer w={['100vw','full']} >
              <Table variant={'simple'} size={'lg'} >
                <TableCaption>All available users in the database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Subscription</Th>
                    <Th isNumeric >Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                  users && users.map(item =>(
                      <Row loading={loading} key={item._id} item={item} updateHandler={updateHandler} deleteButtonHandler={deleteButtonHandler} />
                    ))
                  }
                </Tbody>
              </Table>
  
            </TableContainer>
        </Box>
      )
     }
      <SideBar />
    </Grid>
  );
};

export default Users;


function Row({item ,updateHandler , deleteButtonHandler ,loading }){
  return(
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription && item.subscription.status === 'active' ?"Active" : "Not Active"  }</Td>
      <Td isNumeric >
        <HStack justifyContent={'flex-end'} >
          <Button isLoading={loading} onClick={()=>updateHandler(item._id)} variant={'outline'} color={'purple.500'} >Change Role</Button>
          <Button isLoading={loading} onClick={()=>deleteButtonHandler(item._id)} color={'purple.600'}> <RiDeleteBin7Fill/> </Button>
        </HStack>
      </Td>
    </Tr>
  )
}