<?php

/**
 * Test homepage route
 */
class HomeTest extends TestCase
{
    /**
     * Test that homepage loads correctly
     *
     * @return void
     */
    public function testHomepageRendersCorrectly()
    {
        $this->call('GET', '/');

        $this->assertResponseOk();
    }
}
