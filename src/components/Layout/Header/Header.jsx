import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher'
import React from 'react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/userAction'


const LinkButton = ({ url = '/', title = 'Home',onClose }) => (
    <Link  onClick={onClose} to={url} >
        <Button variant={'ghost'} >{title}</Button>
    </Link>
)


const Header = ({isAuthenticated = false, user}) => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    
  
    const dispatch = useDispatch()
    const logOutHandler = () => {
        onClose()
        dispatch(logout())
    }

    return (
        <>
            <ColorModeSwitcher />
            <Button zIndex={'overlay'} onClick={onOpen} colorScheme='yellow' width={12} height={12} rounded={'full'} position={'fixed'} top={6} left={6} >
                <RiMenu5Fill />
            </Button>
            <Drawer placement='left' isOpen={isOpen} onClose={onClose} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'2px'} >Course Bundler</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4} alignItems={'flex-start'} >
                            <LinkButton  onClose={onClose}  url="/" title='Home' />
                            <LinkButton  onClose={onClose}  url="/courses" title='Browse All Courses' />
                            <LinkButton  onClose={onClose}  url="/request" title='Request a Course' />
                            <LinkButton  onClose={onClose}  url="/contact" title='Contact Us' />
                            <LinkButton  onClose={onClose}  url="/about" title='About' />
                            <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'} >
                                {isAuthenticated ? (<>
                                <VStack>
                                    <HStack>
                                    <Link to={`/profile`} onClick={onClose} >
                                        <Button variant={'ghost'} colorScheme='yellow' >Profile</Button>
                                    </Link>
                                    <Button variant={'ghost'} onClick={logOutHandler} >
                                        <RiLogoutBoxLine />
                                        LogOut
                                    </Button>
                                    </HStack>
                                    {
                                        user && user.role === 'admin' && <Link to={`/admin/dashboard`}>
                                            <Button onClick={onClose} colorScheme='purple' variant={'ghost'} >
                                                <RiDashboardFill style={{margin:"4px"}} /> 
                                                Dashboard
                                            </Button>
                                        </Link>
                                    }
                                </VStack>
                                </>) : (<>
                                    <Link onClick={onClose}  to={`/login`}>
                                        <Button colorScheme='yellow' >Login</Button>
                                    </Link>
                                    <p>OR</p>
                                    <Link onClick={onClose}  to={`/register`}>
                                        <Button colorScheme='yellow' >Sign Up</Button>
                                    </Link>
                                </>)}
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header