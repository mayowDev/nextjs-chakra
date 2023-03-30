import Link from 'next/link'
import { Card, Image, Button, ButtonGroup, CardBody, CardFooter, Stack, Text, Divider, Heading  } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const CardItem = ({title, description, id, handleDelete, handleEdit, route} ) => {
    return(

        <Card maxW='md'>
        <Link href={route} as={route}> 

  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
      alt='coffe  with laptop'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{id}-{title}</Heading>
      <Text> {description.map(item=>item)}</Text>
    </Stack>
  </CardBody>
  </Link>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button onClick={()=>handleDelete(id)} flex='1' variant='ghost'leftIcon={<DeleteIcon />} colorScheme='red'>Delete </Button>
      <Button onClick={()=>handleEdit(id)} flex='1' variant='ghost' leftIcon={<EditIcon />}>
        <Link href={route} as={route}> Edit </Link>
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
                  

    )
}

export default CardItem