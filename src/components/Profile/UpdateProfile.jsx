import React, { useState } from 'react'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({user}) => {
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)

    const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = async (e)=>{
    e.preventDefault()
    await dispatch(updateProfile(name,email))
    dispatch(loadUser())
    navigate('/profile')
  }

  const {loading,message,error} = useSelector(state=>state.profile)



  return (
    <Container py={16} minH={'90vh'}>
    <form onSubmit={submitHandler} >
      <Heading
        children="Update Profile"
        my={16}
        textAlign={['center', 'left']}
        textTransform={'uppercase'}
      />
      <VStack spacing={8}>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          focusBorderColor="yellow.500"
        />
         <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          type="text"
          focusBorderColor="yellow.500"
        />
        <Button isLoading={loading} type='submit' colorScheme='yellow' w={'full'} > Update </Button>
      </VStack>
    </form>
  </Container>
  )
}

export default UpdateProfile