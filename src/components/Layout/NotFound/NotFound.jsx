import React from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

const NotFound = () => {
    return (
        <Container h="90vh" p={16}>
            <VStack justifyContent={'center'} h={'full'} spacing={4}>
                <RiErrorWarningFill size={'5rem'} />
                <Heading>Page Not Found</Heading>

                <Link to={'/'}>
                    <Button variant={'solid'} colorScheme="orange">
                        Go To Home
                    </Button>
                </Link>
            </VStack>
        </Container>
    );
};

export default NotFound;
