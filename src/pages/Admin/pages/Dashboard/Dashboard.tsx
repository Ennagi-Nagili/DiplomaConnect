import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CssBaseline, createTheme, Grid, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

const Dashboard = () => {
  const [t, i18] = useTranslation();
  const isSmallScreen = useMediaQuery('(max-width: 550px)');

  // Mock data for widgets
  const widgetsData = [
    { title: t('Total Visits'), value: 1500 },
    { title: t('Total Students'), value: 3000 },
    { title: t('Total Teachers'), value: 100 },
    { title: t('Teacher-Student Ratio'), value: '1:30' },
  ];

  // Mock data for bar chart
  const barChartData = [
    { name: 'Math', students: 80, teachers: 10 },
    { name: 'Science', students: 60, teachers: 8 },
    { name: 'English', students: 50, teachers: 7 },
    { name: 'History', students: 40, teachers: 5 },
  ];

  // Mock data for pie chart
  const pieChartData = [
    { name: 'Math', value: 30 },
    { name: 'Science', value: 25 },
    { name: 'English', value: 20 },
    { name: 'History', value: 15 },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
        <h2>Dashboard</h2>
        <Grid container spacing={3}>
          {widgetsData.map((widget, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {widget.title}
                  </Typography>
                  <Typography variant="h4">{widget.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Subjects Distribution</Typography>
                <BarChart width={isSmallScreen ? 275 : 400} height={300} data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#8884d8" />
                  <Bar dataKey="teachers" fill="#82ca9d" />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Subjects Distribution (Pie Chart)</Typography>
                <PieChart width={isSmallScreen ? 275 : 400} height={300}>
                  <Pie dataKey="value" isAnimationActive={false} data={pieChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {pieChartData.map((entry, i) => (
                      <Cell key={`${entry} cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
