package com.example.bookstore.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Exchanges
    public static final String ORDERS_EXCHANGE     = "orders.exchange";
    public static final String PAYMENTS_EXCHANGE   = "payments.exchange";
    public static final String EVENTS_EXCHANGE     = "events.exchange";
    public static final String NOTIFICATIONS_EXCHANGE = "notifications.exchange";

    // Queues
    public static final String ORDER_CREATED_QUEUE  = "order.created";
    public static final String ORDER_STATUS_QUEUE   = "order.status";
    public static final String PAYMENT_CONFIRMED_QUEUE = "payment.confirmed";
    public static final String EVENT_REGISTERED_QUEUE  = "event.registered";
    public static final String EMAIL_QUEUE          = "email.queue";

    // Exchanges
    @Bean TopicExchange ordersExchange()       { return new TopicExchange(ORDERS_EXCHANGE); }
    @Bean TopicExchange paymentsExchange()     { return new TopicExchange(PAYMENTS_EXCHANGE); }
    @Bean TopicExchange eventsExchange()       { return new TopicExchange(EVENTS_EXCHANGE); }
    @Bean TopicExchange notificationsExchange(){ return new TopicExchange(NOTIFICATIONS_EXCHANGE); }

    // Queues
    @Bean Queue orderCreatedQueue()     { return QueueBuilder.durable(ORDER_CREATED_QUEUE).build(); }
    @Bean Queue orderStatusQueue()      { return QueueBuilder.durable(ORDER_STATUS_QUEUE).build(); }
    @Bean Queue paymentConfirmedQueue() { return QueueBuilder.durable(PAYMENT_CONFIRMED_QUEUE).build(); }
    @Bean Queue eventRegisteredQueue()  { return QueueBuilder.durable(EVENT_REGISTERED_QUEUE).build(); }
    @Bean Queue emailQueue()            { return QueueBuilder.durable(EMAIL_QUEUE).build(); }

    // Bindings
    @Bean Binding orderCreatedBinding(Queue orderCreatedQueue, TopicExchange ordersExchange) {
        return BindingBuilder.bind(orderCreatedQueue).to(ordersExchange).with("order.created");
    }
    @Bean Binding orderStatusBinding(Queue orderStatusQueue, TopicExchange ordersExchange) {
        return BindingBuilder.bind(orderStatusQueue).to(ordersExchange).with("order.status");
    }
    @Bean Binding paymentConfirmedBinding(Queue paymentConfirmedQueue, TopicExchange paymentsExchange) {
        return BindingBuilder.bind(paymentConfirmedQueue).to(paymentsExchange).with("payment.confirmed");
    }
    @Bean Binding eventRegisteredBinding(Queue eventRegisteredQueue, TopicExchange eventsExchange) {
        return BindingBuilder.bind(eventRegisteredQueue).to(eventsExchange).with("event.registered");
    }
    @Bean Binding emailBinding(Queue emailQueue, TopicExchange notificationsExchange) {
        return BindingBuilder.bind(emailQueue).to(notificationsExchange).with("email.#");
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
