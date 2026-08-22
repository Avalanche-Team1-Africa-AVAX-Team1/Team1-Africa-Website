/**
 * API Connection Test Script
 * 
 * Run this to verify your backend API is accessible
 * Usage: node scripts/test-api-connection.js
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/v1';

async function testApiConnection() {
    console.log('🔍 Testing API Connection...\n');
    console.log(`📡 API Base URL: ${API_BASE_URL}\n`);

    const tests = [
        {
            name: 'Events Endpoint',
            endpoint: '/events',
            method: 'GET'
        },
        {
            name: 'Gallery Endpoint',
            endpoint: '/gallery',
            method: 'GET'
        },
        {
            name: 'Blogs Endpoint',
            endpoint: '/blogs',
            method: 'GET'
        }
    ];

    let passedTests = 0;
    let failedTests = 0;

    for (const test of tests) {
        try {
            console.log(`Testing: ${test.name}`);
            console.log(`  ${test.method} ${API_BASE_URL}${test.endpoint}`);

            const response = await fetch(`${API_BASE_URL}${test.endpoint}`, {
                method: test.method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    console.log(`  ✅ PASS - Status: ${response.status}`);

                    if (data.data && data.data.items) {
                        console.log(`  📊 Found ${data.data.items.length} items`);
                    }

                    passedTests++;
                } else {
                    console.log(`  ⚠️  WARN - Response not successful`);
                    console.log(`  Message: ${data.message || 'No message'}`);
                    failedTests++;
                }
            } else {
                console.log(`  ❌ FAIL - Status: ${response.status}`);
                const errorText = await response.text();
                console.log(`  Error: ${errorText.substring(0, 100)}`);
                failedTests++;
            }
        } catch (error) {
            console.log(`  ❌ FAIL - ${error.message}`);
            failedTests++;
        }

        console.log('');
    }

    // Summary
    console.log('━'.repeat(50));
    console.log('📊 Test Summary:');
    console.log(`  ✅ Passed: ${passedTests}/${tests.length}`);
    console.log(`  ❌ Failed: ${failedTests}/${tests.length}`);
    console.log('━'.repeat(50));

    if (failedTests === 0) {
        console.log('\n🎉 All tests passed! Your API is ready to use.\n');
        process.exit(0);
    } else {
        console.log('\n⚠️  Some tests failed. Please check:');
        console.log('  1. Is your backend running?');
        console.log('  2. Is the API_BASE_URL correct?');
        console.log('  3. Are the endpoints implemented?');
        console.log('  4. Is CORS enabled?\n');
        process.exit(1);
    }
}

// Run tests
if (require.main === module) {
    testApiConnection().catch(error => {
        console.error('\n❌ Fatal error:', error.message);
        console.log('\n💡 Make sure your backend is running at', API_BASE_URL);
        process.exit(1);
    });
}

module.exports = { testApiConnection };
