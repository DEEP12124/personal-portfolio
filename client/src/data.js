export const profile = {
  name: 'Dipanshu Bansal', email: 'sg169947@gmail.com',
  github: 'https://github.com/DEEP12124',
  linkedin: 'https://www.linkedin.com/in/dipanshu-bansal-0a9a743a8/',
  repo: import.meta.env.VITE_REPOSITORY_URL || 'https://github.com/DEEP12124/personal-portfolio',
  photo: import.meta.env.VITE_PROFILE_PHOTO_URL || '',
};
export const projects = [
  {id:'health', number:'01', category:'Machine learning', title:'A healthier use of data.', name:'Hospital Management & Predictive Analytics', description:'Exploring how historical patient data can help anticipate readmissions. A hospital management project with predictive analytics built using scikit-learn.', stack:['Python','scikit-learn','Pandas'], color:'mint', demo:'/lab/health', source:'client/src/Demos.jsx', note:'Interactive dashboard concept · synthetic data'},
  {id:'vision', number:'02', category:'Computer vision', title:'Teaching machines to see.', name:'Weapon Detection in CCTV', description:'A deep learning project exploring weapon detection in CCTV footage, combining a Kaggle training dataset with OpenCV image processing.', stack:['PyTorch','TensorFlow','OpenCV'], color:'lavender', demo:'/lab/vision', source:'client/src/Demos.jsx', note:'Detection visualization · simulated boxes'},
  {id:'movies', number:'03', category:'Recommendation systems', title:'Your next favourite film.', name:'AI-Powered Movie Recommendations', description:'Finding connections between films and people with collaborative and content-based filtering, using the MovieLens dataset, scikit-learn and Pandas.', stack:['Python','scikit-learn','Pandas'], color:'peach', demo:'/lab/movies', source:'client/src/Demos.jsx', note:'Interactive recommender concept · sample catalogue'},
];
export const skillGroups = [
  {number:'01',title:'Frontend',subtitle:'Interfaces, motion and the browser.',items:[['React / React Router','Practicing',64],['JavaScript','Practicing',65],['HTML / CSS','Practicing',68]]},
  {number:'02',title:'Backend & databases',subtitle:'APIs and the data behind them.',items:[['Node.js / Express','Practicing',60],['MongoDB / Mongoose','Building foundations',58],['SQL','Foundation',65]]},
  {number:'03',title:'AI & machine learning',subtitle:'Experiments with intelligent systems.',items:[['Python / scikit-learn','Applied in projects',84],['PyTorch / TensorFlow','Project experience',78],['Pandas / NumPy','Data workflows',82]]},
  {number:'04',title:'Tools & technologies',subtitle:'A creative production toolkit.',items:[['Git / GitHub','Project workflow',68],['Premiere Pro / After Effects','Creative practice',86],['Blender / DaVinci Resolve','Creative practice',78]]}
];
