const axios = require('axios');

async function testPostRequest() {
  try {
    const response = await axios.post('http://localhost:3000/user', {
      name: 'Alice Johnson',
      email: 'alice@example.com'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testUpdateUniversity() {
  try {
    const response = await axios.patch('http://localhost:3000/user/updateUniversity', {
      userId: 1,
      universityId: 2
    });
    console.log('Updated user: ', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testUpdateSubjects() {
  try {
    const response = await axios.patch('http://localhost:3000/user/updateSubjects', {
      userId: 1,
      subjects: ['chem', 'PE']
    });
    console.log('Updated user: ', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testCreateSubject() {
  try {
    const response = await axios.post('http://localhost:3000/subjects/create', {name: "Chem"})
    console.log('All subjects: ', response.data);
  }catch(error){
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testUpdateDBSubjects() {
  try{
    const response = await axios.post('http://localhost:3000/user/subjects', {
      userId: 1,
      subjects: [1, 2, 3]
    })
  }catch(error){
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// testPostRequest();
//testUpdateUniversity();
// testUpdateSubjects();
// testCreateSubject()
testUpdateDBSubjects();
