import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../redux/store'
import { buySubscription } from '../../redux/actions/userAction'
import { toast } from 'react-hot-toast'
import logo from "../../assests/images/logo.png"

const Subscribe = ({user}) => {
    const dispatch = useDispatch()
    const [key, setKey] = useState('')
    const  {loading,error,message, subscriptionId} = useSelector(state=>state.subscription)
    const  {error:courseError} = useSelector(state=>state.course)
    const subscribeHandler = async()=>{
      const {data:{key}} =   await axios.get(`${server}/razorpaykey`)
      setKey(key)
      dispatch(buySubscription())
    }
    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:'clearError'})
      }

      if(courseError){
        toast.error(courseError)
        dispatch({type:'clearError'})
      }

      if (subscriptionId) {
        const openPopUp = () => {
          const options = {
            key,
            name: 'CourseBundler',
            description: 'Get access to all premium content',
            image: logo,
            subscription_id: subscriptionId,
            callback_url: `${server}/paymentverification`,
            prefill: {
              name: user.name,
              email: user.email,
              contact: '',
            },
            notes: {
              address: 'Course Bundler Admin',
            },
            theme: {
              color: '#FFC800',
            },
          };
  
          const razor = new window.Razorpay(options);
          razor.open();
        };
        openPopUp();
      }
      if(message){
        toast.success(message)
        dispatch({type:'clearMessage'})
      }
    }, [message,error,dispatch, user.name,user.email,key,subscriptionId,courseError ])
    
  return (
    <Container h={'90vh'} p={16} >
        <Heading  children="Welcome" my={8} textAlign={'center'}  />
        <VStack boxShadow={'lg'} alignItems={'stretch'} borderRadius={'lg'} spacing={0} >

            <Box bg={'yellow.400'} p={4} css={{borderRadius:"8px 8px  0 0"}} >
                <Text color={'black'} children={`Pro Pack - ₹ 499`} />
            </Box>
            <Box p={4} >
                <VStack textAlign={'center'} px={8} mt={4} spacing={8} >
                    <Text  children={`Join pro pack to access all content.`} />
                <Heading size={'md'} children={`₹ 499 Only`} />
                </VStack>
                <Button isLoading={loading} onClick={subscribeHandler} my={8} w={'full'} colorScheme='yellow' >
                    Buy Now
                </Button>
            </Box>
            <Box bg={'blackAlpha.600'} p={4} css={{borderRadius:"0 0 8px 8px"}} >
                <Heading color={'white'} textTransform={'uppercase'}size={'sm'} children="100% refund on cancellation"/>
                <Text color={'white'} fontSize={'xs'} children={`*Terms and condition apply`} />
            </Box>
        </VStack>

    </Container>
  )
}

export default Subscribe