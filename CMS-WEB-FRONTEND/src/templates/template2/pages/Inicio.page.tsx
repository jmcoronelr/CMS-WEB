import { IInicioPage } from '@/templates/interfaces/pages/inicio.page.interface';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import {
    Login as LoginIcon,
    Search as SearchIcon,
    RecentActors as RecentActorsIcon,
    SpaceDashboard as SpaceDashboardIcon,
    Person as PersonIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';


export default function InicioPage({
    title, goToLogin, goToRegister, auth, logout, goToDashboard
}: IInicioPage){

    return <>
        <Box>
            <Box maxWidth={'90vw'} marginX={'auto'} marginY={1} marginBottom={8} style={{backgroundColor: '#df5f03',
                background: 'linear-gradient(90deg, #df9603 0%, rgba(3,113#df7503(10,95,181,1) 43%, #8f4f0a 71%)',
                 borderRadius:20
            }
            }>
                <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    height='auto'
                    paddingX={1}
                    paddingBottom={5}
                    color='#fff' 
                    textAlign={'center'}
                >                    
                    <Typography fontSize={'3em'} fontWeight={'bold'}>
                        {title}
                    </Typography>
                </Stack>
                {!auth.isAuth && <Stack 
                    direction='row' 
                    alignItems={'center'} 
                    gap={2} padding={2}
                    maxWidth={800} 
                    marginX='auto'
                    justifyContent={'center'}
                >
                    <LinkWithIcon goTo={goToLogin}  label='Ingresar' icon={<LoginIcon fontSize='small'/>} />
                    <LinkWithIcon goTo={goToRegister}  label='Registrarse' icon={<RecentActorsIcon fontSize='small'/>} />
                </Stack>}
                {auth.isAuth && <Stack 
                    direction='row' 
                    alignItems={'center'} 
                    gap={2} padding={2}
                    maxWidth={800} 
                    marginX='auto'
                    justifyContent={'center'}
                >
                    <LinkWithIcon goTo={goToLogin}  label={auth.userData?.username || 'Mi cuenta'} icon={<PersonIcon fontSize='small'/>} />
                    <LinkWithIcon goTo={goToDashboard}  label='Dashboard' icon={<SpaceDashboardIcon fontSize='small'/>} />
                    <LinkWithIcon goTo={logout}  label='Salir' icon={<ExitToAppIcon fontSize='small'/>} />
                </Stack>}
            </Box>
        </Box>
        <Grid container>
            <Grid item xs={2} paddingLeft={1}>
                <Stack direction={'column'} justifyContent={'center'} gap={2}>
                    <Box sx={{ boxShadow: 3 }}   margin={'auto'} borderRadius={10} style={{background: '#fff'}}>
                        <Stack direction='row' alignItems={'center'}gap={1.6} paddingY={1} paddingX={1}>     
                            <Box paddingTop={1}>
                                    <SearchIcon fontSize='medium' color={'primary'}/>
                            </Box>
                            <Box style={{width:'100%'}}>                            
                                <input
                                    style={{
                                        width:'100%',
                                        outline: 'none',
                                        border: 'none',
                                        background: 'none',
                                        fontSize: '1em'
                                    }}
                                    placeholder='Buscar contenido...'
                                />
                            </Box>                       
                        </Stack>
                    </Box>
                    <Box>
                        <Stack direction={'column'} gap={1} overflow={'auto'} paddingBottom={1} paddingX={2} marginBottom={2}>
                            <Chip
                                variant='filled'
                                color='primary'
                                label='redes'
                            />
                            <Chip
                                variant='outlined'
                                color='primary'
                                label='programación'
                            />
                            <Chip
                                variant='outlined'
                                color='primary'
                                label='calculo II'
                            />
                            <Chip
                                variant='outlined'
                                color='primary'
                                label='Investigación de operaciones I'
                            />
                        </Stack>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={10}>                
                <Box paddingBottom={2} paddingX={1}>
                    <Stack direction={'row'} flexWrap={'wrap'} gap={1} justifyContent={'center'}>
                        <Box style={{width: '100%', height: '100%'}} maxWidth={'380px'}>
                            <ContentCard
                                title='Llamado a Concurso Externo: Auxiliar Administrativo para el Departamento Operativo de Contrataciones ' 
                                publishedDate='12/12/2024' 
                                shortDescrition='Auxiliar Administrativo para el Departamento Operativo de Contrataciones (CE-FP-UNA-27-2024)...'
                                image='https://cdn-icons-png.flaticon.com/512/695/695896.png'
                            />
                        </Box>
                        <Box style={{width: '100%', height: '100%'}} maxWidth={'380px'}>
                            <ContentCard
                                title='Estudiantes de Ingeniería en Energía Presentan Trabajo Final de Grado sobre Diésel Renovable en el Transporte Público' 
                                publishedDate='12/12/2024' 
                                shortDescrition='El pasado martes 27 de agosto de 2024, a las 17:00 horas, en el aula B02 de la Facultad Politécnica...'
                                image='https://i0.wp.com/www.pol.una.py/wp-content/uploads/IMG_3343-scaled.jpg?resize=768%2C665&ssl=1'
                            />
                        </Box>
                        <Box style={{width: '100%', height: '100%'}} maxWidth={'380px'}>
                            <ContentCard
                                title='Estudiantes de Ingeniería en Energía Presentan Trabajo Final de Grado sobre Diésel Renovable en el Transporte Público' 
                                publishedDate='12/12/2024' 
                                shortDescrition='El pasado martes 27 de agosto de 2024, a las 17:00 horas, en el aula B02 de la Facultad Politécnica...'
                                image='https://i0.wp.com/www.pol.una.py/wp-content/uploads/IMG_3343-scaled.jpg?resize=768%2C665&ssl=1'
                            />
                        </Box>
                        <Box style={{width: '100%', height: '100%'}} maxWidth={'380px'}>
                            <ContentCard
                                title='Llamado a Concurso Externo: Auxiliar Administrativo para el Departamento Operativo de Contrataciones ' 
                                publishedDate='12/12/2024' 
                                shortDescrition='Auxiliar Administrativo para el Departamento Operativo de Contrataciones (CE-FP-UNA-27-2024)...'
                                image='https://cdn-icons-png.flaticon.com/512/695/695896.png'
                            />
                        </Box>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    </>
}

interface LinkWithIconProps{
    label: string,
    goTo: () => void,
    icon: React.ReactElement
}
function LinkWithIcon({
    label, icon, goTo,
}: LinkWithIconProps){
    return  <Link onClick={(e) => {e.preventDefault(); goTo()}}  style={{textDecoration: 'none', cursor: 'pointer', background:'#ffffff1f', padding: '2px 8px', borderRadius:3}} color='#fff'>
        
        <Stack direction='row' alignItems={'center'} gap={1}>
            <Box paddingTop={.5}>
                {icon}
            </Box>
            <Box>
                {label}
            </Box>
        </Stack>
    </Link>
}


interface ContentCardProps{
    title: string,
    publishedDate: string,
    shortDescrition: string, 
    image: string
}
function ContentCard({
    title, publishedDate, shortDescrition, image
}: ContentCardProps){
    return <>
        <Card>
            <CardContent>
                <Stack gap={2}>
                    <Box style={{width:'100%', height: 280}} maxWidth={'250px'} textAlign={'center'} marginX={'auto'}>
                        <img   
                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            src={`${image}`}
                        />
                    </Box>
                    <Stack>
                        <Stack>
                            <Typography fontWeight={'Bold'}>{title}</Typography>
                            <Typography fontWeight={'light'} fontSize={'.7em'}>publicado el {publishedDate}</Typography>
                        </Stack>
                        <Box paddingTop={1} paddingBottom={3}>
                            <Divider/>
                        </Box>
                        <Typography  fontSize='.95em'>
                            {shortDescrition} <Link style={{cursor: 'pointer'}}>leer mas</Link>
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    </>
}