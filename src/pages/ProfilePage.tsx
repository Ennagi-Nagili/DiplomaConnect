import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, SecondaryListItems } from '../components/listItems';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore } from '@mui/icons-material';
import { CustomizedTables } from '../components/CustomTable';
import logo from '/src/assets/dip_logo.png'

const drawerWidth: number = 256;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    image: string;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <img src={props.image} alt="" />
        </Dialog>
    );
}

export const ProfilePage = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [dialog, setDialog] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");

    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = (value: string) => {
        setDialog(false);
        setSelectedValue(value);
    };

    const [profile, setProfile] = React.useState("./src/assets/defaults.png");

    function importImage() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            if (input.files != null) {
                let image = input.files[0];
                var reader = new FileReader();

                reader.onload = function (e) {
                    if (e.target != null) {
                        setProfile(e.target.result);
                    }
                }

                reader.readAsDataURL(image);
            }
        };
        input.click();
    }

    let display: string;
    let display2: string

    if (open) {
        display = "block";
        display2 = "none";
    } else {
        display = "none";
        display2 = "block";
    }

    return (
        <div>
            <style>{"\
                        body{\
                          overflow:hidden;\
                        }\
                      "}</style>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <img src={logo} alt="" className='logo' />
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <div style={{ height: 650, overflow: "auto", paddingBottom: 60 }}>
                            <Grid container>
                                <Grid item xs={6} sx={{ display: display }}>
                                    <Avatar src={profile} sx={{ width: 64, height: 64 }}
                                        className='avatar' onClick={() => {
                                            handleClickOpen();
                                        }} />
                                </Grid>

                                <Grid item xs={6} className='edit-container'>
                                    <div >
                                        <EditIcon className="edit" sx={{ display: display }} onClick={() => {
                                            importImage();
                                        }} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Accordion elevation={0} sx={{
                                display: display,
                                '&:before': {
                                    display: 'none',
                                }
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className='accordion-head'>Personal Information</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {mainListItems}
                                </AccordionDetails>
                            </Accordion>
                            <div style={{ display: display2 }}>
                                {mainListItems}
                            </div>
                            <Divider sx={{ my: 1 }} />
                            <SecondaryListItems open={open} />
                        </div>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container>
                            <Grid item>
                                <p className='head'>Profil məlumatları</p>
                                <div id='section-name'>
                                    <p className='info-head'>Ad & Soyad</p>
                                    <p>Müəllimov Müəllim</p>
                                </div>
                                <div id='section-phone'>
                                    <p className='info-head'>Telefon nömrəsi</p>
                                    <p>+994 12 345 67 89</p>
                                </div>
                                <div id='section-mail'>
                                    <p className='info-head'>E-mail ünvanı</p>
                                    <p>mualim2023@gmail.com</p>
                                </div>
                                <div id='section-date'>
                                    <p className='info-head'>Doğum yeri və tarixi</p>
                                    <p>30.11.2023 Bakı, Azərbaycan</p>
                                </div>
                                <div id='section-education'>
                                    <p className='info-head'>Təhsil və elmi dərəcələr</p>
                                    <p>2023-2024, Orta məktəb</p>
                                    <p>2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində bakalvr təhsili</p>
                                    <p>2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində magistr təhsili</p>
                                    <p>2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində doktorantura təhsili</p>
                                    <p>2023-2024, Fəlsəfə doktorluğu: Tezis: "Azərbaycan ilahiyyyat"</p>
                                </div>
                                <div id='section-work'>
                                    <p className='info-head'>Əmək fəaliyyəti</p>
                                    <p>2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində müəllim</p>
                                    <p>Keçdiyi fənnlər: "Azərbaycanda ilahiyyat", "Uzaq şərqdə ilahiyyat", "Amerikada ilahiyyat"</p>
                                </div>
                                <div id='section-event'>
                                    <p className='info-head'>Beynəlxalq tədbirlərdə iştirak</p>
                                    <p>2023, Dünya universitetləri təhsil sərgisi</p>
                                    <p>2024, Dünya dinləri tədbiri</p>
                                </div>
                                <div id='section-books'>
                                    <p className='info-head'>Yazdığı kitablar</p>
                                    <p>Dinin insan psixologiyasına təsiri, 2023 Baku 230 s</p>
                                    <p>Ateizmlə mübarizə, 2024 Baku 345 s</p>
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <div id='section-request'>
                                    <p className='main-head'>Elmi rəhbərlik tələbləri</p>
                                    <CustomizedTables type={"request"} />
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <div id='section-students'>
                                    <p className='main-head'>Mənim tələbələrim</p>
                                    <CustomizedTables type={"student"} />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>

            <SimpleDialog
                selectedValue={selectedValue}
                open={dialog}
                onClose={handleClose}
                image={profile}
            />
        </div>
    );
}