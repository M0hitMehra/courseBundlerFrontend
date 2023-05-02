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

const PaymentFail = () => {
    return (
        <Container h="90vh" p={16}>
            <VStack justifyContent={'center'} h={'full'} spacing={4}>
                <RiErrorWarningFill size={'5rem'} />
                <Heading textTransform={'uppercase'} >Payment Fail</Heading>

                <Link to={'/subscribe'}>
                    <Button variant={'solid'} colorScheme="orange">
                        Try Again
                    </Button>
                </Link>
            </VStack>
        </Container>
    );
};
export default PaymentFail