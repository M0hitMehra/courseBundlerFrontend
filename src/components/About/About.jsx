import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introVideo from '../../assests/videos/introVideo.mp4'
import { RiSecurePaymentFill } from 'react-icons/ri'
import data  from '../../assests/docs/termsAndConditions'

const Founder = () => (
    <Stack direction={['column', 'row']} spacing={[4, 16]} padding={8}>
        <VStack >
            <Avatar src='https://avatars.githubusercontent.com/u/98013205?v=4' boxSize={[40, 48]} />
            <Text children="Co-Founder" opacity={0.7} />
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center', 'flex-start']} >
            <Heading children="Mohit Mehra" size={['md', 'xl']} />
            <Text children="Hi I am a web developer and this web app was for the purpose implementing my knowledge in practical" />
        </VStack>
    </Stack>
)

const VideoPlayer = () => (
    <Box>
        <video autoPlay loop muted controls src={introVideo} controlsList='nodownload nofullscreen noremoteplayback' disablePictureInPicture disableRemotePlayback >
        </video>
    </Box>
)

const TandC = ({termsAndCondition}) => (
    <Box>
        <Heading size={'md'} children='Terms & Conditions' textAlign={['center','left']} my={4} />
        <Box overflowY={'scroll'}  h={'sm'} p={4} >
            <Text fontFamily={'heading'} letterSpacing={'widest'} textAlign={['center','left']} children={termsAndCondition} />
            <Heading my={4} size={'xs'} children="Refund applicable within 7 days of purchase" />
        </Box>
    </Box>

)

const About = () => {
    return (
        <Container maxW={'container.lg'} padding={16} boxShadow={'lg'} >
            <Heading children="About Us" textAlign={['center', 'left']} />
            <Founder />
            <Stack m={8} direction={['column', 'row']} alignItems={'center'}>
                <Text fontFamily={'cursive'} m={8} textAlign={['center', 'left']} children="This platform hold some videos which are open source and we do not hold any copyrights of them" />
                <Link to={`/subscribe`} >
                    <Button variant={'ghost'} colorScheme='yellow' >
                        Checkout Our plan
                    </Button>
                </Link>
            </Stack>
            <VideoPlayer />
            <TandC termsAndCondition={data} />
            <HStack my={4} p={4}>
                <RiSecurePaymentFill />
                <Heading size={'xs'} fontFamily={'sans-serif'} textTransform={'uppercase'} children="Payment is secured by razor pay" />
            </HStack>
        </Container>
    )
}

export default About