import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/userAction'

export const fileUploadCss = {
    cursor:'pointer',
    marginLeft:"-5%",
    width:"110%",
    border:"none",
    height:"100%",
    color:"#ECC94B",
    backgroundColor:"white"
}

const fileUploadStyle = {
    "&::file-selector-button":fileUploadCss
}

const Register = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [imgPrev, setImgPrev] = useState()
  const [image, setImage] = useState()

  const changeImageHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
        setImgPrev(reader.result)
        setImage(file)
    }
  }

  const dispatch = useDispatch()

  const submitHandler = (e)=>{
    e.preventDefault()
    const myForm = new FormData()
    myForm.append('name',name)
    myForm.append('email',email)
    myForm.append('password',password)
    myForm.append('file',image)

    dispatch(register(myForm))

  }

  return (
    <Container h={'95vh'} >
      <VStack h={'full'} spacing={16} justifyContent={'center'} >
        <Heading textTransform={'uppercase'} children="Make an account" />
        <form onSubmit={submitHandler} style={{ width: '100%' }} >
         <Box display={'flex'} justifyContent={'center'} my={'4'} >
            <Avatar src={imgPrev} size={'2xl'} />
         </Box>
        <Box my={4} >
            <FormLabel htmlFor='name' children="Name" />
            <Input required id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='abc' type="name" focusBorderColor='yellow.500' />
          </Box>
         
          <Box my={4} >
            <FormLabel htmlFor='email' children="Email Address" />
            <Input required id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='abc@gmail.com' type="email" focusBorderColor='yellow.500' />
          </Box>

          <Box my={4} >
            <FormLabel htmlFor='password' children="Password" />
            <Input required id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' type="password" focusBorderColor='yellow.500' />
          </Box>

          <Box my={4} >
            <FormLabel htmlFor='chooseAvatar' children="Choose Avatar" />
            <Input css={fileUploadStyle} onChange={changeImageHandler} required id='chooseAvatar' accept='image/*'    type="file" focusBorderColor='yellow.500' />
          </Box>

           
          <Button my={'4'} colorScheme='yellow'type='submit' >
            Register
          </Button>
          <Box>
            Already have an account? <Link to='/login' >
              <Button colorScheme='yellow' variant={'link'} >
                Login
              </Button>
             {' '} here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  )
}

export default Register