import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {
    const loaction = useLocation()
  return (
    <VStack  spacing={8} padding={16} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
        <LinkButton url={'dashboard'} Icon={RiDashboardFill} text={"Dashboard"}  active={loaction.pathname === '/admin/dashboard' }  />
        <LinkButton url={'createcourse'} Icon={RiAddCircleFill} text={"Create Course"}  active={loaction.pathname === '/admin/createcourse' } />
        <LinkButton url={'admincourses'} Icon={RiEyeFill} text={"Courses"} active={loaction.pathname === '/admin/admincourses' }  />
        <LinkButton url={'users'} Icon={RiUser3Fill} text={"Users"} active={loaction.pathname === '/admin/users' }  />

    </VStack>
  )
}

export default SideBar

function LinkButton({url,Icon ,text ,active}){
    return(
        <Link to={`/admin/${url}`} >
        <Button fontSize={'larger'} variant={'ghost'} colorScheme={active ?"purple":"" } >
            <Icon style={{margin:"4px"}} />
            {text}
        </Button>
        </Link>
    )
}