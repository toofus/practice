<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/cms/dashboard", name="app_dashboard")
     */
    public function show(): Response
    {
        return $this->render('dashboard.html.twig');
    }
}
