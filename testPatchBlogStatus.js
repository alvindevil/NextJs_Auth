import axios from 'axios';

async function testPatchBlogStatus() {
  const url = 'http://localhost:3000/api/users/blogs';
  const blogId = '6889f6169331785c35296d11';

  try {
    // Valid update to public
    let response = await axios.patch(url, {
      blogId,
      type: 'public'
    });
    console.log('Valid update response:', response.data);

    // Invalid blogId
    response = await axios.patch(url, {
      blogId: 'invalidid',
      type: 'public'
    });
    console.log('Invalid blogId response:', response.data);

    // Invalid type
    response = await axios.patch(url, {
      blogId,
      type: 'invalidtype'
    });
    console.log('Invalid type response:', response.data);

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testPatchBlogStatus();
