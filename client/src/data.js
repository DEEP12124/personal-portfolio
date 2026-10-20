export const profile = {
  name: 'Dipanshu Bansal', email: 'sg169947@gmail.com',
  github: 'https://github.com/DEEP12124',
  linkedin: 'https://www.linkedin.com/in/dipanshu-bansal-0a9a743a8/',
  repo: import.meta.env.VITE_REPOSITORY_URL || '',
  photo: import.meta.env.VITE_PROFILE_PHOTO_URL || '',
};
export const projects = [
  {id:'health', number:'01', category:'Machine learning', title:'A healthier use of data.', name:'Hospital Management & Predictive Analytics', description:'Exploring how historical patient data can help anticipate readmissions. A hospital management project with predictive analytics built using scikit-learn.', stack:['Python','scikit-learn','Pandas'], color:'mint', demo:'/lab/health', source:'client/src/Demos.jsx', note:'Interactive dashboard concept · synthetic data'},
  {id:'vision', number:'02', category:'Computer vision', title:'Teaching machines to see.', name:'Weapon Detection in CCTV', description:'A deep learning project exploring weapon detection in CCTV footage, combining a Kaggle training dataset with OpenCV image processing.', stack:['PyTorch','TensorFlow','OpenCV'], color:'lavender', demo:'/lab/vision', source:'client/src/Demos.jsx', note:'Detection visualization · simulated boxes'},
  {id:'movies', number:'03', category:'Recommendation systems', title:'Your next favourite film.', name:'AI-Powered Movie Recommendations', description:'Finding connections between films and people with collaborative and content-based filtering, using the MovieLens dataset, scikit-learn and Pandas.', stack:['Python','scikit-learn','Pandas'], color:'peach', demo:'/lab/movies', source:'client/src/Demos.jsx', note:'Interactive recommender concept · sample catalogue'},
];
export const skillGroups = [
  {number:'01',title:'AI & machine learning',subtitle:'Turning data into possibilities.',items:[['Python','Applied in projects',88],['PyTorch / TensorFlow','Project experience',78],['scikit-learn','Applied in projects',84],['Pandas / NumPy','Data workflows',82]]},
  {number:'02',title:'Frontend & backend',subtitle:'Bringing ideas to the browser.',items:[['React / JavaScript','Practicing',64],['HTML / CSS','Practicing',68],['Node.js / Express','Practicing',60],['MongoDB / SQL','Building foundations',58]]},
  {number:'03',title:'Tools & creative tech',subtitle:'Where logic meets a visual story.',items:[['Git / GitHub','Project workflow',68],['Premiere Pro / After Effects','Creative practice',86],['Blender / Autodesk Maya','3D practice',72],['DaVinci Resolve / CapCut','Creative practice',82]]}
];
